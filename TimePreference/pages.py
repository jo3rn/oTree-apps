from ._builtin import Page, WaitPage
from .models import Constants


class Selection(Page):
    pass


class Results(Page):
    pass


page_sequence = [
    Selection,
    Results
]
