from datetime import datetime, timedelta
import pytest

from ox_watt.django import jwt


class CustomToken(jwt.JWToken):
    name: str


class TestJWToken:
    def test_encode_decode(self):
        token = CustomToken(name="foo", expiration=datetime.now() + timedelta(hours=1))
        encoded = token.encode()
        decoded = CustomToken.decode(encoded)
        assert decoded == token

    def test_expiration_check(self):
        with pytest.raises(ValueError):
            CustomToken(expiration=datetime.now() - timedelta(hours=1))


def test_encode_decode():
    data = {"a": 123, "foo": {"bar": "tee"}}
    encoded = jwt.encode(data)
    decoded = jwt.decode(encoded)
    assert encoded != data
    assert decoded == data


def test_decode_with_bad_data():
    with pytest.raises(Exception):
        jwt.decode("foo@bar.tee")
