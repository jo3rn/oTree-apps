from otree.api import (
    models, widgets, BaseConstants, BaseSubsession, BaseGroup, BasePlayer
)


author = 'jo3rn'

doc = """
A player clicks on a question mark. If the other side is a coin, he can click another or end the game. If the other side 
is the devil however he looses the game.
"""


class Constants(BaseConstants):
    name_in_url = 'OneByOne'
    players_per_group = None
    num_rounds = 7
    num_coins = 10


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    gender = models.StringField()
    participant_code = models.StringField(
        label="Teilnehmer Code"
    )
    round_collected_coins = models.IntegerField()
    total_collected_coins = models.CurrencyField()
    round_clicks = models.IntegerField()
    round_selected = models.IntegerField()
    round_time = models.IntegerField()

