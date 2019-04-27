from ._builtin import Page, WaitPage
from .models import Constants


class GroupingWaitPage(WaitPage):
    group_by_arrival_time = True

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds + 1

    def get_players_for_group(self, waiting_players):
        single_players = [p for p in waiting_players if p.participant.vars['game_mode'] == 1]
        multi_players = [p for p in waiting_players if p.participant.vars['game_mode'] == 2]

        if len(single_players) > 0:
            return [single_players[0]]

        if len(multi_players) > 1:
            return [multi_players[0], multi_players[1]]


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
        if self.participant.vars['game_mode'] == 1:
            total = self.participant.payoff
        else:
            if self.player.get_opponent().participant.payoff > self.participant.payoff:
                total = 0
                self.participant.payoff = 0
            elif self.player.get_opponent().participant.payoff == self.participant.payoff:
                total = 10
                self.participant.payoff = 10
            else:
                total = 20
                self.participant.payoff = 20

        return {
            'total': total
        }


page_sequence = [
    GroupingWaitPage,
    Pond,
    SelectGameMode,
    PerceptionGroup,
    ResultsWaitPage,
    Results
]
