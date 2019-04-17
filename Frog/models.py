from otree.api import (
    models, BaseConstants, BaseSubsession, BaseGroup, BasePlayer,
)


author = 'Your name here'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'Frog'
    players_per_group = None
    num_test_rounds = 1
    num_real_rounds = 4
    num_rounds = num_test_rounds + num_real_rounds


class Subsession(BaseSubsession):
    def creating_session(self):
        for p in self.get_players():
            p.participant.vars["test_frogs"] = 0


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    frog_success = models.IntegerField()
    game_mode = models.IntegerField()
    pass
