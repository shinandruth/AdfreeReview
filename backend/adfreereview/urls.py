from django.conf.urls import url, include
from .views import myModelList
from .views import signup, signin, signout
from .views import current_user, my_ratings, latest_posts, top_posts, recommend_posts
from .views import get_rating
from .views import token


urlpatterns = [
    url(r'^mymodel$', myModelList, name='myModelList'),
    url(r'^signup$', signup, name='signup'),
    url(r'^signin$', signin, name='signin'),
    url(r'^signout$', signout, name='signout'),
    url(r'^user$', current_user, name='current_user'),
    url(r'^user/rating$', my_ratings, name='my_ratings'),
    url(r'^post/latest$', latest_posts, name='latest_posts'),
    url(r'^post/top$', top_posts, name='top_posts'),
    url(r'^post/top/(?P<category_id>[0-9]+)$', recommend_posts, name='recommend_posts'),
    url(r'^rating/(?P<adfreescore>\d+)/(?P<contentscore>\d+)/(?P<comment>[\w ]+)/(?P<url>http://[\w ./]+)', get_rating, name='get_rating'),
    url(r'^token$', token, name='token')
]
