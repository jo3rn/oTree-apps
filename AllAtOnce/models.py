from otree.api import (
    models, widgets, BaseConstants, BaseSubsession, BaseGroup, BasePlayer,
)


author = 'jo3rn'

doc = """
A player clicks on as many question marks as he likes. After that he chooses to turn all question marks at once.
If the other side reveals a coin, it is added to the score. If one question mark reveals the devil he looses the game.
"""


class Constants(BaseConstants):
    name_in_url = 'AllAtOnce'
    players_per_group = None
    num_rounds = 7
    num_coins = 10


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    round_collected_coins = models.IntegerField()
    total_collected_coins = models.CurrencyField()
    round_clicks = models.IntegerField()
    round_selected = models.IntegerField()
    round_time = models.IntegerField()
