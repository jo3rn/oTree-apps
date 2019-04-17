from ._builtin import Page, WaitPage
from .models import Constants


class Pond(Page):
    form_model = 'player'
    form_fields = ['frog_success']

    def before_next_page(self):
        if self.round_number == 0:
            self.participant.vars["test_frogs"] = 0
        if self.round_number > Constants.num_test_rounds:
            self.player.payoff = self.player.frog_success
        else:
            self.participant.vars["test_frogs"] += self.player.frog_success

    def vars_for_template(self):
        if self.round_number <= Constants.num_test_rounds:
            frogs = self.participant.vars["test_frogs"]
        else:
            frogs = self.participant.payoff
        return {
            'round': self.round_number - Constants.num_test_rounds,
            'frogs': frogs,
        }


class SelectGameMode(Page):
    form_model = 'player'
    form_fields = ['game_mode']

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds


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
    SelectGameMode,
    ResultsWaitPage,
    Results
]
