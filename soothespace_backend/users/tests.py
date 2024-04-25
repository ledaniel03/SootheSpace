from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileTest(TestCase):
    def setUp(self):
        # Ensure there is no existing user or profile that could cause a conflict
        User.objects.filter(username='testuser').delete()
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_profile_creation(self):
        """Test that the UserProfile is created for new users."""
        self.assertTrue(UserProfile.objects.filter(user=self.user).exists(), "UserProfile was not created")

    def test_profile_link(self):
        """Test that the UserProfile is linked correctly to the User."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertEqual(self.user.profile, profile, "UserProfile link to User is broken")

    def test_profile_defaults(self):
        """Test default values of UserProfile fields."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertIsNone(profile.profile_picture, "Default profile picture is not None")
        self.assertFalse(profile.privacy, "Default privacy setting is not False")

    def test_profile_str(self):
        """Test the string representation of the UserProfile."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertEqual(str(profile), 'testuser', "UserProfile string representation is incorrect")
