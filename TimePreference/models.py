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
    pass
