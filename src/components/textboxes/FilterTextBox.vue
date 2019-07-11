<template>
  <div class="filter-textbox textbox" v-bind:title="tooltip">
    <input v-on:keyup="handleKeyUp" type="text" class="tb-filter" v-bind:placeholder="watermark" />
    <div class="regex-button filter-button" v-on:click="handleButtonClick" title="Match using regular expression">.*</div>
    <div class="case-button filter-button" v-on:click="handleButtonClick" title="Match using case sensitivity">Aa</div>
  </div>
</template>

<style lang="scss">
.filter-textbox {
  $radius: 5px;
  display: grid;
  grid-template-areas: "input button button";
  grid-template-columns: 80% 10% 10%;

  .tb-filter {
    border-radius: $radius;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
    padding: 5px;

    &:focus {
      outline: none;
    }
  }

  .filter-button {
    padding: 4px 8px;
    background-color: rgb(187, 187, 187);
    color: black;
    font-weight: bold;
    font-size: 0.75em;
    display: inline-block;
    cursor: default;
    user-select: none;
    text-align: center;
    border-right: 1px solid black;

    &:last-child {
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
      border-right: none;
    }

    &.active {
      background-color: rgb(55, 148, 255);
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { FilterTextBoxEventArgs } from '../../common/event-arguments/filter-text-box-event-args';

@Component
export default class FilterTextBox extends Vue {
  static inputReceivedEvent: string = 'inputReceived';
  static buttonClickedEvent: string = 'buttonClicked';

  regexEnabled: boolean = false;
  caseSensitive: boolean = false;
  filterValue: string = '';

  @Prop(String)
  tooltip!: string;
  @Prop(String)
  watermark!: string;

  handleKeyUp($event: KeyboardEvent) {
    const target = $event.target as HTMLInputElement;

    this.filterValue = target.value;

    const args = new FilterTextBoxEventArgs<HTMLInputElement>();

    args.target = target;
    args.regexEnabled = this.regexEnabled;
    args.caseSensitive = this.caseSensitive;
    args.filterValue = this.filterValue;

    this.$emit(FilterTextBox.inputReceivedEvent, args);
  }

  handleButtonClick($event: MouseEvent) {
    const target = $event.target as HTMLDivElement | null;
    const args = new FilterTextBoxEventArgs<HTMLDivElement>();
    let active: boolean;

    if (target) {
      if (target.classList.contains("active")) {
        target.classList.remove("active");
        active = false;
      } else {
        target.classList.add("active");
        active = true;
      }

      [
        {
          name: "regex-button",
          action: () =>
            active ? (this.regexEnabled = true) : (this.regexEnabled = false)
        },
        {
          name: "case-button",
          action: () =>
            active ? (this.caseSensitive = true) : (this.caseSensitive = false)
        }
      ]
        .filter(item => target.classList.contains(item.name))
        .map(item => item.action)
        .forEach(action => action());

      args.filterValue = this.filterValue;
      args.target = target;
      args.caseSensitive = this.caseSensitive;
      args.regexEnabled = this.regexEnabled;

      this.$emit(FilterTextBox.buttonClickedEvent, args);
      this.focusOnInput();
    }
  }

  focusOnInput() {
    (this.$el.querySelector(".tb-filter") as HTMLInputElement).focus();
  }
}
</script>
