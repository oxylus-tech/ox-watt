import pytest

from ox_watt.django import functional, tests


class OwnedClass(functional.Owned, tests.Mock):
    pass


@pytest.fixture
def owned():
    return OwnedClass(foo=123, bar={"tee": 456})


class TestOwned:
    def test_contribute(self, owned):
        owner = tests.Mock()
        owned_2 = owned.contribute(owner)

        assert getattr(owned, "_owner", None) is None
        assert owned_2._owner is owner
        assert owned_2 is not owned
        assert (owned_2.foo, owned_2.bar) == (owned.foo, owned.bar)
