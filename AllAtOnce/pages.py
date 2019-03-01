from ._builtin import Page, WaitPage
from .models import Constants


class Instructions(Page):
    def is_displayed(self):
        return self.round_number == 1


class SelectAll(Page):
    form_model = 'player'
    form_fields = ['round_collected_coins', 'round_clicks', 'round_time']

    def vars_for_template(self):
        return {
            'round': self.round_number,
            'total_payoff': self.participant.payoff,
            'total_payoff_list': range(int(self.participant.payoff)),
            'num_coins_list': range(Constants.num_coins)
        }

    def before_next_page(self):
        self.player.payoff = self.player.round_collected_coins
        self.player.total_collected_coins = self.participant.payoff


class ResultsWaitPage(WaitPage):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def after_all_players_arrive(self):
        pass


class Results(Page):
    def vars_for_template(self):
        return {
            'total_payoff': self.participant.payoff
        }

    def is_displayed(self):
        return self.round_number == Constants.num_rounds


page_sequence = [
    Instructions,
    SelectAll,
    ResultsWaitPage,
    Results
]
