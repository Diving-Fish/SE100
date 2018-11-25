import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('test method in_dict', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    let words = ['data', 'dsfa', 'code', 'dsagt', 'cate', 'dbgt', 'date']
    let results = [true, false, true, false, true, false, true]
    for (let i = 0; i < 7; i++) expect(vm.in_dict(words[i])).toEqual(results[i]);
  })
  it('test method find_neighbor', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    let cases = ['cate', 'code', 'cote']
    let results = [
      ['date', 'cote'],
      ['cote'],
      ['cate', 'code']
    ]
    for (let i = 0; i < 3; i++) expect(vm.find_neighbor(cases[i])).toEqual(results[i]);
  })
  it('test method build', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    let cases = [
      ['date', 'data'],
      ['cate', 'data'],
      ['code', 'data'],
      ['absolute', 'byte']
    ]
    let results = [
      ['date', 'data'],
      ['cate', 'date', 'data'],
      ['code', 'cote', 'cate', 'date', 'data'],
      ['No ladder.']
    ]
    for (let i = 0; i < 4; i++) expect(vm.build(cases[i][0], cases[i][1])).toEqual(results[i]);
  })
})