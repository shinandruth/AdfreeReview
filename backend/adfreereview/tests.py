from django.test import TestCase
from django.forms.models import model_to_dict
from django.contrib.auth.models import User

from .models import Blog, Post, Rating, Profile

class AdfreeTestCase(TestCase):
    def setUp(self):
        User.objects.create(username='admin', password='adminadmin', email="a@a.com")

    def test_user_str(self):
        admin = User.objects.get(username='admin')
        self.assertEqual(str(admin), 'admin')
