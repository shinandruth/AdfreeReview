import re
from urllib.parse import urlparse
from .models import Rating
import numpy as np
from bs4 import BeautifulSoup as bs
import requests


############################################ URL urils ############################################


blog_urls = {
    'naver': re.compile('blog.naver.com$'),
    'daum': re.compile('blog.daum.net$'),
    'egloos': re.compile('\w+[.]egloos[.]com$'),
    'tistory': re.compile('\w+[.]tistory[.]com$')
}

rating_infos = {
    # 0.0 - 5.0
    'adfreescore': re.compile('^(0(\.\d+)?|1(\.\d+)?|2(\.\d+)?|3(\.\d+)?|4(\.\d+)?|5(\.0+)?)$'),
    # 0.0 - 5.0
    'contentscore': re.compile('^(0(\.\d+)?|1(\.\d+)?|2(\.\d+)?|3(\.\d+)?|4(\.\d+)?|5(\.0+)?)$'),
    # string include `~!@#$%^&*()-=_+][{}:"'>,>.?/
    'comment':  re.compile('^[ \w~`!@#$%^&*\(\)-=_+\[\]\\\|\"\'\:\.\,><?\/]+$'),
    # url starting with http
    'url': re.compile('^http://[\w~`!@#$%^&*\(\)-=_+\[\]\\\|\"\'\:\.\,><?\/]+$')
}


def check_domain(url):
    parsed_url = urlparse(url)
    for domain, match in blog_urls.items():
        if match.match(parsed_url.netloc):
            return domain
    return None


def check_title(url):
    parsed_url = urlparse(url)
    domain = check_domain(url)
    if domain == 'naver':
        return parsed_url.path.split('/')[1]
    elif domain == 'daum':
        return parsed_url.path.split('/')[1]
    elif domain == 'egloos':
        return parsed_url.netloc.split('.')[0]
    elif domain == 'tistory':
        return parsed_url.netloc.split('.')[0]
    else:
        return None


def check_blog_url(url):
    domain = check_domain(url)
    title = check_title(url)
    if domain == 'naver':
        return "http://blog.naver.com/{}".format(title)
    elif domain == 'daum':
        return "http://blog.daum.net/{}".format(title)
    elif domain == 'egloos':
        return "http://{}.egloos.com".format(title)
    elif domain == 'tistory':
        return "http://{}.tistory.com".format(title)
    else:
        return None


######################################### Rating urils ############################################


def check_rating_validity(req_data):
    for component, match in rating_infos.items():
        if not match.match(req_data[component]):
            return (False, component)
    return (True, None)


########################################## Score urils ############################################


score_portion = {'adfree': 0.5, 'content': 0.5}


def update_scores(rating):
    post = rating.post
    if post.rating_count == 0:
        new_rating_count = 1
        new_adfree_score = float(rating.adfree_score)
        new_content_score = float(rating.content_score)
        new_total_score = new_adfree_score * score_portion['adfree'] + new_content_score * score_portion['content']
    else:
        old_adfree_score = float(post.adfree_score)
        old_content_score = float(post.content_score)
        old_rating_count = float(post.rating_count)

        new_adfree_score = (old_adfree_score * old_rating_count + float(rating.adfree_score)) / (old_rating_count + 1)
        new_content_score = (old_content_score * old_rating_count + float(rating.content_score)) / (old_rating_count + 1)
        new_total_score = new_adfree_score * score_portion['adfree'] + new_content_score * score_portion['content']
        new_rating_count = old_rating_count + 1

    post.adfree_score = new_adfree_score
    post.content_score = new_content_score
    post.total_score = new_total_score
    post.rating_count = new_rating_count
    post.save()

def update_category(post):
    ratings = Rating.objects.filter(post=post)
    categories = {
        'etc': 0,
        'Beauty': 0,
        'Food': 0,
        'IT': 0,
        'Fashion': 0
    }
    most_frequent = 'etc'
    if len(ratings) == 0:
        pass
    else:
        for rating in ratings:
            categories[rating.category] += 1
        max_num = -1
        for category, num in categories.items():
            if num >= max_num:
                max_num = num
                most_frequent = category
    post.category = most_frequent
    post.save()


def get_post_title(url, domain):
    def get_naver_title(url):
        initial_html = bs(requests.get(url).text, 'html.parser')
        if initial_html.find(id="screenFrame") is not None:
            screenhtml = initial_html.find(id="screenFrame").get("src")
            screen_html = bs(requests.get(screenhtml).text, 'html.parser')
        else:
            screen_html = initial_html
        main_html = "http://blog.naver.com" + screen_html.find(id="mainFrame").get("src")
        title = bs(requests.get(main_html).text, 'html.parser').find(property="og:title").get("content")
        return title

    def get_daum_title(url):
        initial_html = bs(requests.get(url).text, 'html.parser')
        frames = initial_html.findAll("frame")
        for frame in frames:
            if frame.get("name") == "BlogMain":
                main_html = bs(requests.get("http://blog.daum.net" + frame.get("src")).text, 'html.parser')
                break
        title = main_html.find(property="og:title").get("content")
        return title

    def get_egloos_title(url):
        initial_html = bs(requests.get(url).text, "html.parser")
        title = initial_html.find(property="og:title").get("content")
        return title

    def get_tistory_title(url):
        return "DEFAULT_TITLE"

    title = ""
    if domain == 'tistory':
        try:
            title = get_tistory_title(url)
        except:
            title = "NOTITLE"
    elif domain == "naver":
        try:
            title = get_naver_title(url)
        except:
            title = "NOTITLE"
    elif domain == "daum":
        try:
            title = get_daum_title(url)
        except:
            title = "NOTITLE"
    elif domain == "egloos":
        try:
            title = get_egloos_title(url)
        except:
            title = "NOTITLE"

    return title
