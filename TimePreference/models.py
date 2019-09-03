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


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    choice_scenario_1 = models.StringField()
    choice_scenario_2 = models.StringField()
    choice_scenario_3 = models.StringField()
    choice_scenario_4 = models.StringField()
    choice_scenario_5 = models.StringField()
