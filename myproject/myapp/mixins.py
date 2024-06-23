# mixins.py
from .utils import execute_raw_sql

class RawSQLMixin:
    def fetch_records(self, query, params=None):
        return execute_raw_sql(query, params)
    
    def create_record(self, query, params=None):
        return execute_raw_sql(query, params)
