<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div class="container">
        <ul>
          <input type="checkbox" v-model="allow_unequal_length" />
          Allow Unequal Length
          <input type="checkbox" v-model="allow_start_not_in_dict" />
          Allow Start Word not in dictionary
        </ul>
        <div class="div1">
          <p>
            Start:
            <input v-model="start"/>
            End:
            <input v-model="end"/>
          </p>
          <button v-on:click="doing = build(start, end).join('->')">Generate</button>
        </div>
      <h2>Status: {{ phase }}</h2>
      <h3>{{ doing }}</h3>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
var dictionary = new Array("cate", "code", "cote", "data", "date");
var characters = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Word Ladder (Remaked by Vue.js)",
      allow_unequal_length: false,
      allow_start_not_in_dict: false,
      start: "code",
      end: "data",
      doing: "",
      phase: "inputing",
      dict: dictionary,
    };
  },
  methods: {
    binary_search: function(elem, array) {
      var step = (array.length - (array.length % 4)) / 4;
      var index = (array.length - (array.length % 2)) / 2;
      while (true) {
        if (array[index] < elem) {
          index += step;
        } else if (array[index] > elem) {
          index -= step;
        } else {
          return index;
        }
        if (
          (elem < array[index + 1] && elem > array[index]) ||
          index >= array.length ||
          index < 0
        ) {
          return -1;
        }
        step -= step % 2;
        step /= 2;
        if (step == 0) {
          step = 1;
        }
      }
    },

    in_dict: function(word) {
      return (this.binary_search(word, dictionary) >= 0);
    },

    replace_index: function(word, index, char) {
      var str1 = word.slice(0, index);
      var str2 = word.slice(index+1);
      return str1 + char + str2;
    },

    change_string: function (word, index) {
      var dict_array = new Array();
      for (var i = 0; i < characters.length; i++) {
        var str = this.replace_index(word, index, characters[i]);
        if (this.in_dict(str) && word != str) {
          dict_array.push(str);
        }
      }
      return dict_array;
    },

    find_neighbor: function(word) {
      var neighbor = new Array();
      for (var index = 0; index < word.length; index++) {
        neighbor = neighbor.concat(this.change_string(word, index));
        if (this.allow_unequal_length) {
          var str = this.replace_index(word, index, "");
          if (this.in_dict(str)) {
            neighbor.push(str);
          }
        }
      }
      return neighbor;
    },

    pointer: function(first, second) {
      this.first = first;
      this.second = second;
    },

    index_of: function(elem, array, type) {
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
    },

    build: function(end, start) {
    if (start.length != end.length) {
        if (this.allow_unequal_length) {
            if (start.length < end.length) {
                var queue = build(start, end);
                queue.reverse();
                return queue;
            }
        } else {
            var queue = new Array("No ladder.");
            return queue;
        }
    }
    if (!this.in_dict(start) && !this.allow_start_not_in_dict) {
        var queue = new Array("No ladder.");
        return queue;
    }
    if (!this.in_dict(end)) {
        var queue = new Array("No ladder.");
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
        var neighbor = this.find_neighbor(current);
        if (this.index_of(current, searched, "second") == -1) {
            for (var index = 0; index < neighbor.length; index++) {
                if (this.index_of(neighbor[index], searched, "first") == -1) {
                    queue.push(neighbor[index]);
                    var p = new this.pointer(neighbor[index], current);
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
            current = searched[this.index_of(current, searched, "first")].second;
            queue.push(current);
        }
    }
    return queue;
    }
  }
};
</script>

<style>
.container {
  margin: auto;
  width: 600px;
  height: auto;
}
.center {
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
}
input {
  vertical-align: middle;
}
polyline {
  fill: none;
  stroke: #000000;
  stroke-width: 2px;
  stroke-dasharray: 5px;
}
h3 {
  text-align: center;
}
.div1 {
  margin: 30px;
  font-size: 18px;
}
input {
  height: 30px;
  font-size: 15px;
  margin: 5px;
}
h4 {
  margin-top: 10px;
  text-align: center;
}
button {
  font-size: 16px;
  height: 30px;
  width: 120px;
  margin-top: 15px;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
