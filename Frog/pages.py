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

    def before_next_page(self):
        self.participant.vars['game_mode'] = self.player.game_mode


class PerceptionGroup(Page):
    form_model = 'player'
    form_fields = ['others_will_score']

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds and self.participant.vars['game_mode'] == 2


class ResultsWaitPage(WaitPage):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def after_all_players_arrive(self):
        pass


class Results(Page):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def vars_for_template(self):

        opponent_index = self.participant.vars['opponent_index']
        opponent_id = self.player.get_opponent_id(opponent_index)
        opponent = self.group.get_player_by_id(opponent_id)

        if self.participant.vars['game_mode'] == 1:
            total = int(self.participant.payoff)
        else:
            if opponent.participant.payoff > self.participant.payoff:
                total = 0
            elif opponent.participant.payoff == self.participant.payoff:
                total = 10
            else:
                total = 20

        self.player.opponent_id = opponent_id
        self.player.final_score = total

        return {
            'total': total
        }


page_sequence = [
    Pond,
    SelectGameMode,
    PerceptionGroup,
    ResultsWaitPage,
    Results
]
