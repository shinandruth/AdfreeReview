from django.conf.urls import url, include
from .views import myModelList
from .views import signup, signin, signout, get_rating
from .views import token


urlpatterns = [
    url(r'^mymodel$', myModelList, name='myModelList'),
    url(r'^signup$', signup, name='signup'),
    url(r'^signin$', signin, name='signin'),
    url(r'^signout$', signout, name='signout'),
    url(r'^token$', token, name='token'),
    url(r'^rating/(?P<adfreescore>\d+)/(?P<contentscore>\d+)/(?P<comment>[\w ]+)/(?P<url>http://[\w ./]+)', get_rating, name='get_rating'),
]
