from ._builtin import Page, WaitPage
from .models import Constants


class Selection(Page):
    form_model = 'player'
    form_fields = ['choice_scenario_1', 'choice_scenario_2', 'choice_scenario_3', 'choice_scenario_4',
                   'choice_scenario_5']


class Results(Page):
    pass


page_sequence = [
    Selection,
    Results
]
