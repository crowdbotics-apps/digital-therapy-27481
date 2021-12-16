from enum import Enum


class CategoryEnum(Enum):
    couple = 'Couple'
    family = 'Family'
    friend = 'Friend'
    self = 'Self'


class ItemStatusEnum(Enum):
    sent = 'Sent'
    replied = 'Replied'
    confirmed = 'Confirmed'
    not_confirmed = 'Not confirmed'


class ItemTypeEnum(Enum):
    main = 'Main'
    response = 'Response'
    opinion = 'Opinion'
