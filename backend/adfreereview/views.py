from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import MyModel, Post, Blog, Rating
from .url_utils import check_domain, check_title, check_blog_url
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json

from urllib.parse import urlparse


def myModelList(request):
    if request.method == 'GET':
        return JsonResponse(list(MyModel.objects.all().values()), safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        email = req_data['email']
        password = req_data['password']
        User.objects.create_user(username=username, email=email, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_rating(request, adfreescore, contentscore, comment, url):
    if request.method == 'GET':
        domain = check_domain(url)
        title = check_title(url)
        blog_url = check_blog_url(url)
        blog, created = Blog.objects.get_or_create(domain=domain, title=title, url=blog_url)
        post, created = Post.objects.get_or_create(blog=blog, title="DEFAULT TITLE", url=url, category="DEFAULT CATEGORY")  # FIXME get title and category
        user = User.objects.get(username=request.user.username)
        rating = Rating(user=user, post=post, adfree_score=adfreescore, content_score=contentscore, comment=comment)
        rating.save()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
