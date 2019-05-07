import random
from otree.api import (
    models, BaseConstants, BaseSubsession, BaseGroup, BasePlayer,
)


author = 'jo3rn'

doc = """
A player clicks on a frog and it jumps into a pond or not. The player can then choose to play alone or against another.
"""


class Constants(BaseConstants):
    name_in_url = 'frog'
    players_per_group = None
    num_test_rounds = 10
    num_real_rounds = 10
    num_rounds = num_test_rounds + num_real_rounds


class Subsession(BaseSubsession):
    def creating_session(self):
        if self.round_number == 1:
            number_of_opponents = len(self.get_players()) - 1
            for p in self.get_players():
                p.participant.vars["test_frogs"] = 0
                p.participant.vars['opponent_index'] = random.randrange(0, number_of_opponents)


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    frog_success = models.IntegerField()
    game_mode = models.IntegerField()
    others_will_score = models.StringField()
    opponent_id = models.IntegerField()
    final_score = models.IntegerField()

    def get_opponent_id(self, index):
        return self.get_others_in_group()[index].id_in_group
