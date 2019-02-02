from otree.api import (
    models, widgets, BaseConstants, BaseSubsession, BaseGroup, BasePlayer,
    Currency as c, currency_range
)


author = 'jo3rn'

doc = """
A player turns a coin. If the other side is also a coin, he can turn another coin or end the game. If the other side 
is the devil however he looses the game.
"""


class Constants(BaseConstants):
    name_in_url = 'OneByOne'
    players_per_group = None
    num_rounds = 1
    num_coins = 10


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    collected_coins = models.IntegerField()
