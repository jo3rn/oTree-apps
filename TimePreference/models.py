import random
from otree.api import (
    models, widgets, BaseConstants, BaseSubsession, BaseGroup, BasePlayer,
    Currency as c, currency_range
)


author = 'jo3rn'

doc = """
Player chooses between getting 1 coin now or receiving 1-5 coins later
"""


class Constants(BaseConstants):
    name_in_url = 'timePref'
    players_per_group = None
    num_rounds = 1
    number_of_decisions = 5


class Subsession(BaseSubsession):
    def creating_session(self):
        if self.round_number == 1:
            for p in self.get_players():
                p.participant.vars['chosen_scenario'] = random.randrange(1, Constants.number_of_decisions + 1)


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    choice_scenario_1 = models.StringField()
    choice_scenario_2 = models.StringField()
    choice_scenario_3 = models.StringField()
    choice_scenario_4 = models.StringField()
    choice_scenario_5 = models.StringField()
    chosen_choice = models.StringField()
