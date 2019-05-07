from ._builtin import Page
from .models import Constants


class Instructions(Page):
    def is_displayed(self):
        return self.round_number == 1

    def vars_for_template(self):
        return {
            'round': self.round_number,
            'total_payoff_app': 0,
            'total_payoff_app_list': range(0),
            'num_coins_list': range(Constants.num_coins)
        }


class Select(Page):
    form_model = 'player'
    form_fields = ['round_collected_coins', 'round_clicks', 'round_time']

    def vars_for_template(self):
        cumulative_payoff = sum([p.payoff for p in self.player.in_all_rounds()])

        return {
            'round': self.round_number,
            'total_payoff_app': cumulative_payoff,
            'total_payoff_app_list': range(int(cumulative_payoff)),
            'num_coins_list': range(Constants.num_coins)
        }

    def before_next_page(self):
        self.player.payoff = self.player.round_collected_coins
        self.player.total_collected_coins = self.participant.payoff


class Results(Page):
    def vars_for_template(self):
        return {
            'total_payoff': self.participant.payoff
        }

    def is_displayed(self):
        return self.round_number == Constants.num_rounds


page_sequence = [
    Instructions,
    Select,
    Results
]
