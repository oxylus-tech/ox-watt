import pytest

from django.conf import settings
from django.contrib.auth.models import AnonymousUser, User, Group


# ---- Users & Groups
@pytest.fixture
def user(db):
    return User.objects.create_user(
        username="test-user", password="test", first_name="test", last_name="user", email="test@user.org"
    )


@pytest.fixture
def user_1(db):
    return User.objects.create_user(
        username="test-1-user", password="test-1", first_name="test-1", last_name="user", email="test-1@user.org"
    )


@pytest.fixture
def staff_user(db):
    return User.objects.create_user(username="staff-user", password="test", is_staff=True)


@pytest.fixture
def anon_user():
    return AnonymousUser()


@pytest.fixture
def group(transactional_db):
    return Group.objects.create(name="group 1")


@pytest.fixture
def group_2(transactional_db):
    return Group.objects.create(name="group 2")


@pytest.fixture
def user_groups(user, group, group_2):
    user.groups.set([group, group_2])


# ----  Agents
@pytest.fixture
def agent(user):
    return user.agent


@pytest.fixture
def agent_1(user_1):
    return user_1.agent

