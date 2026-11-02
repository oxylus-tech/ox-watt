"""
This module is inherited from legacy. It certainly would deleted in the future in
favor to common testing tools.
"""

__all__ = ("Mock", "track_calls")


class Mock:
    """Provide a class to mock class and values."""

    def __init__(self, **attrs):
        self.__dict__.update(attrs)


def track_calls(obj, name, returns=None):
    """
    Spoof object's method to keep track of its calls.

    :param obj: object to spoof method from
    :param name: method name
    :param retuns: return value
    :return a list in which calls will be stored. For each call: ``(args, kwargs)``.
    """
    calls = []

    def func(*a, **kw):
        calls.append((a, kw))
        return returns

    setattr(obj, name, func)
    return calls
