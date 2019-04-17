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


class GroupingWaitPage(WaitPage):
    group_by_arrival_time = True

    def is_displayed(self):
        return self.round_number == Constants.num_test_rounds

    def get_players_for_group(self, waiting_players):
        print('in get_players_for_group')
        single_players = [p for p in waiting_players if p.participant.vars['game_mode'] == 1]
        multi_players = [p for p in waiting_players if p.participant.vars['game_mode'] == 2]

        if len(single_players) > 0:
            print('create single player group')
            return [single_players[0]]

        if len(multi_players) > 1:
            print('create multi player group')
            return [multi_players[0], multi_players[1]]

        print('not enough players to create a group')


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
    GroupingWaitPage,
    ResultsWaitPage,
    Results
]
