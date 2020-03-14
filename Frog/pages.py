from ._builtin import Page, WaitPage
from .models import Constants


class Instructions(Page):
    def is_displayed(self):
        return self.round_number == 1


class Pond(Page):
    form_model = 'player'
    form_fields = ['frog_success']

    def before_next_page(self):
        if self.round_number == 0:
            self.participant.vars["test_frogs"] = 0
            self.participant.vars["real_frogs"] = 0
        if self.round_number > Constants.num_test_rounds:
            self.participant.vars['real_frogs'] += self.player.frog_success
        else:
            self.participant.vars["test_frogs"] += self.player.frog_success

    def vars_for_template(self):
        if self.round_number <= Constants.num_test_rounds:
            frogs = self.participant.vars["test_frogs"]
        else:
            frogs = self.participant.vars['real_frogs']
        return {
            'round': self.round_number - Constants.num_test_rounds,
            'frogs': frogs,
        }


class SelectGameMode(Page):
    form_model = 'player'
    form_fields = ['game_mode']

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds

    def vars_for_template(self):
        return {
            'multiplayer_coins_win': range(Constants.multiplayer_coins_win),
            'multiplayer_coins_tie': range(Constants.multiplayer_coins_tie),
        }

    def before_next_page(self):
        self.participant.vars['game_mode'] = self.player.game_mode


class PerceptionGroup(Page):
    form_model = 'player'
    form_fields = ['others_will_score']

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds and self.participant.vars['game_mode'] == 2


class AudioGameMode(Page):
    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds

    def vars_for_template(self):
        return {
            'game_mode': self.participant.vars['game_mode']
        }


class ResultsWaitPage(WaitPage):
    template_name = 'CustomWaitPage.html'

    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def after_all_players_arrive(self):
        pass


class Results(Page):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds

    def vars_for_template(self):
        own_frogs = self.participant.vars['real_frogs']

        if self.participant.vars['game_mode'] == 1:
            total = own_frogs
            opponent_frogs = 0
        else:
            opponent_index = self.participant.vars['opponent_index']
            opponent_id = self.player.get_opponent_id(opponent_index)
            opponent = self.group.get_player_by_id(opponent_id)
            self.player.opponent_id = opponent_id
            opponent_frogs = opponent.participant.vars['real_frogs']

            if opponent_frogs > own_frogs:
                total = 0
            elif opponent_frogs == own_frogs:
                total = 10
            else:
                total = 20

        self.player.final_score = total
        self.player.payoff = total

        return {
            'own_frogs': own_frogs,
            'opponent_frogs': opponent_frogs,
            'game_mode': self.participant.vars['game_mode'],
            'total': self.player.final_score
        }


page_sequence = [
    Instructions,
    Pond,
    SelectGameMode,
    PerceptionGroup,
    AudioGameMode,
    ResultsWaitPage,
    Results
]
