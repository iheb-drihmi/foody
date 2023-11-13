from bson.json_util import dumps, loads
import json


def parse_json(data):
    return json.loads(dumps(data))
