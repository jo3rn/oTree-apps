from otree.api import (
    models, widgets, BaseConstants, BaseSubsession, BaseGroup, BasePlayer
)


author = 'jo3rn'

doc = """
A player turns a coin. If the other side is also a coin, he can turn another coin or end the game. If the other side 
is the devil however he looses the game.
"""


class Constants(BaseConstants):
    name_in_url = 'OneByOne'
    players_per_group = None
    num_rounds = 10
    num_coins = 10


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    round_collected_coins = models.IntegerField()
    total_collected_coins = models.CurrencyField()
    round_clicks = models.IntegerField()
    round_time = models.IntegerField()

