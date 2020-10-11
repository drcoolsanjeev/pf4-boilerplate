const TYPEAHEAD_REQUIRED_LENGTH: number = 5;

enum FetchPolicy {
  NETWORK_ONLY = "network-only",
  CACHE_FIRST = "cache-first",
  CACHE_ONLY = "cache-only",
  NO_CACHE = "no-cache",
  STAND_BY = "standby",
  CACHE_AND_NETWORK = "cache-and-network"
}

enum TypeAheadMessage {
  NO_RESULT_FOUND = "No Results Found",
  MORE_CHAR_REQUIRED = "Enter more characters"
}

export { FetchPolicy, TypeAheadMessage, TYPEAHEAD_REQUIRED_LENGTH };
