from ._builtin import Page, WaitPage
from .models import Constants


class Pond(Page):
    form_model = 'player'
    form_fields = ['frog_success']

    def before_next_page(self):
        self.player.payoff = self.player.frog_success


class ResultsWaitPage(WaitPage):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def after_all_players_arrive(self):
        pass


class Results(Page):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds


page_sequence = [
    Pond,
    ResultsWaitPage,
    Results
]
