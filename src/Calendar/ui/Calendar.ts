import { Component, Root } from '../../Component';

export class Calendar extends Component {
  constructor(public root: Root) {
    super();
  }

  template() {
    return `
      This will be calendar
    `;
  }
}
