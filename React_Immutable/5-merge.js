import { Map, List } from 'immutable';

function concatElements(page1, page2) {
    const map_one = List(page1);const map_two = List(page2);
    return map_one.concat(map_two);
}

function mergeElements(page1, page2) {
    const map_one = Map(page1);
    const map_two = Map(page2);
    return map_one.merge(map_two);
}