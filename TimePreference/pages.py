from ._builtin import Page, WaitPage
from .models import Constants


class Selection(Page):
    form_model = 'player'
    form_fields = ['choice_scenario_1', 'choice_scenario_2', 'choice_scenario_3', 'choice_scenario_4',
                   'choice_scenario_5']

    def vars_for_template(self):
        return dict(
            chosen_scenario=self.participant.vars['chosen_scenario'],
        )

    def before_next_page(self):
        chosen_scenario=self.participant.vars['chosen_scenario']
        if chosen_scenario == 1:
            self.player.chosen_choice = self.player.choice_scenario_1
        elif chosen_scenario == 2:
            self.player.chosen_choice = self.player.choice_scenario_2
        elif chosen_scenario == 3:
            self.player.chosen_choice = self.player.choice_scenario_3
        elif chosen_scenario == 4:
            self.player.chosen_choice = self.player.choice_scenario_4
        elif chosen_scenario == 5:
            self.player.chosen_choice = self.player.choice_scenario_5


class Results(Page):
    def vars_for_template(self):
        coins = self.player.chosen_choice[-1:]
        time = "nächste Woche"
        if "left" in self.player.chosen_choice:
            coins = "1"
            time = "heute"
        
        return dict(
            coinsThisGame=coins,
            time=time,
            coinsOtherGames=self.participant.payoff,
        )


page_sequence = [
    Selection,
    Results
]
