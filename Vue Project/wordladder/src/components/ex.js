/* eslint-disable */
var dictionary = new Array('code', 'cade', 'cate', 'cici');
var characters = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

function binary_search(elem, array) {
    var step = (array.length - array.length % 4) / 4;
    var index = (array.length - array.length % 2) / 2;
    while (true) {
        if (array[index] < elem) {
            index += step;
        } else if (array[index] > elem) {
            index -= step;
        } else {
            return index;
        }
        if ((elem < array[index+1] && elem > array[index]) || index >= array.length || index < 0) {
            return -1;
        }
        step -= step % 2;
        step /= 2;
        if (step == 0) {
            step = 1;
        }
    }
}

function in_dict(word) {
    return (binary_search(word, dictionary) >= 0);
}

function replace_index(word, index, char) {
    var str1 = word.slice(0, index);
    var str2 = word.slice(index+1);
    return str1 + char + str2;
}

function change_string(word, index) {
    var dict_array = new Array();
    for (var i = 0; i < characters.length; i++) {
        var str = replace_index(word, index, characters[i]);
        if (in_dict(str) && word != str) {
            dict_array.push(str);
        }
    }
    return dict_array;
}

function find_neighbor(word) {
    var neighbor = new Array();
    for (var index = 0; index < word.length; index++) {
        neighbor = neighbor.concat(change_string(word, index));
        if (allow_unequal_length) {
            var str = replace_index(word, index, "");
            if (in_dict(str)) {
                neighbor.push(str);
            }
        }
    }
    return neighbor;
}

function pointer(first, second) {
    this.first = first;
    this.second = second;
}

function index_of(elem, array, type) {
    for (var i = 0; i < array.length; i++) {
        var x;
        if (type == "first") {
            x = array[i].first;
        } else if (type == "second") {
            x = array[i].second;
        }
        if (x == elem) {
            return i;
        }
    }
    return -1;
}

function build(end, start) {
    if (start.length != end.length) {
        if (allow_unequal_length) {
            if (start.length < end.length) {
                var queue = build(start, end);
                queue.reverse();
                return queue;
            }
        } else {
            var queue = new Array();
            return queue;
        }
    }
    if (!in_dict(start) && !allow_start_not_in_dict) {
        var queue = new Array();
        return queue;
    }
    if (!in_dict(end)) {
        var queue = new Array();
        return queue;
    }
    var searched = new Array();
    var queue = new Array();
    queue.push(start);
    var flag = false;
    while (true) {
        var current = queue[0];
        if (current == end) {
            flag = true;
            break;
        }
        queue.splice(0, 1);
        var neighbor = find_neighbor(current);
        if (index_of(current, searched, "second") == -1) {
            for (var index = 0; index < neighbor.length; index++) {
                if (index_of(neighbor[index], searched, "first") == -1) {
                    queue.push(neighbor[index]);
                    var p = new pointer(neighbor[index], current);
                    searched.push(p);
                }
            }
        }
        if (queue.length == 0) {
            flag = false;
            break;
        }
    }
    queue.splice(0);
    if (flag) {
        queue.push(end);
        current = end;
        while (current != start) {
            current = searched[index_of(current, searched, "first")].second;
            queue.push(current);
        }
    }
    return queue;
}