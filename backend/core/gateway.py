import braintree
from django.conf import settings

BRAIN_TREE_CONFIG = settings.BRAIN_TREE


class Gateway(object):
    """
    https://developer.paypal.com/braintree/docs/start/hello-server/python
    """

    def __init__(self):
        self.gateway = braintree.BraintreeGateway(
            braintree.Configuration(
                environment=BRAIN_TREE_CONFIG.get('environment') or braintree.Environment.Sandbox,
                merchant_id=BRAIN_TREE_CONFIG.get('merchant_id'),
                public_key=BRAIN_TREE_CONFIG.get('public_key'),
                private_key=BRAIN_TREE_CONFIG.get('private_key'),
            )
        )

    @classmethod
    def client_token(cls):
        return cls()._client_token()

    def _client_token(self):
        return self.gateway.client_token.generate()

    @classmethod
    def sale(cls, payload):
        return cls()._sale(payload)

    def _sale(self, payload):
        """
            {
                "amount": "10.00",
                "payment_method_nonce": nonce_from_the_client,
                "device_data": device_data_from_the_client,
                "options": {
                  "submit_for_settlement": True
                },
                "billing": {
                  "postal_code": postal_code_from_the_client
                }
            }
        """
        return self.gateway.transaction.sale(
            payload
        )
