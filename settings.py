from os import environ

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = {
    'real_world_currency_per_point': 1.00,
    'participation_fee': 0.00,
    'doc': "",
}

SESSION_CONFIGS = [
    {
        'name': 'Devils_Task_Frog_Time_Preference',
        'display_name': "Devil's Task, Frog & Time Preference",
        'num_demo_participants': 4,
        'app_sequence': ['OneByOne', 'AllAtOnce', 'Frog', 'TimePreference'],
    },
    {
        'name': 'Devils_Task',
        'display_name': "Devil's Task",
        'num_demo_participants': 1,
        'app_sequence': ['OneByOne', 'AllAtOnce'],
    },
    {
        'name': 'Frog',
        'display_name': 'Frog',
        'num_demo_participants': 4,
        'app_sequence': ['Frog'],
    },
    {
        'name': 'Time_Preference',
        'display_name': 'Time Preference',
        'num_demo_participants': 1,
        'app_sequence': ['TimePreference'],
    }
]


# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True
POINTS_CUSTOM_NAME = ''

ROOMS = []

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = 'sf&a2hg_kj0pq6qheo9h5lpg#448fman8%9a3)%1jv8=v48stb'

# if an app is included in SESSION_CONFIGS, you don't need to list it here
INSTALLED_APPS = ['otree']
DEBUG = False
