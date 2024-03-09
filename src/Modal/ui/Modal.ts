import { Component, IComponent } from '../../Component';
import { bootstrapCss } from '../../shared';

export class Modal<T extends IComponent> extends Component {
  private isOpened: boolean = false;

  constructor(public title: string, public body: T) {
    super();
    this.root = () => document.querySelector('.modal-root')!;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.mountRoot();
    this.body.root = () => document.querySelector('.modal-body')!;
    this.children.push(this.body);
  }

  public mountRoot(): void {
    if (document.querySelector('.modal-root')) return;
    const div = document.createElement('div');
    div.className = 'modal-root';
    div.addEventListener('click', this.handleClickOutside);
    document.body.appendChild(div);
  }

  public template(): string {
    return this.isOpened
      ? `
      <div class="modal-container">
        <div class="modal-head">
          <h2>
            ${this.title}
          </h2>
          <span class="modal-close-button" aria-label="Close modal" role="button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4L12 12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4L4 12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div class="modal-body"></div>
      </div>
    `
      : '';
  }

  public open(): void {
    this.isOpened = true;
    document.querySelector('.modal-root')!.classList.add('modal-root-open');
    this.render();
    this.hydrate();
  }

  public close(): void {
    this.isOpened = false;
    document.querySelector('.modal-root')!.classList.remove('modal-root-open');
    this.unMount();
    this.teardown();
  }

  public handleClick(ev: MouseEvent): void {
    if ((ev.target as HTMLElement).closest('.modal-close-button')) this.close();
  }

  public handleClickOutside(ev: MouseEvent): void {
    if (!(ev.target as HTMLElement).closest('.modal-container')) this.close();
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.handleClick);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.handleClick);
  }
}

bootstrapCss`
.modal-root {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-root-open {
  display: block;
}

.modal-container {
  width: 80%;
  max-width: 600px;
  height: 80%;
  max-height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  padding: 1rem;
  background-color: #181818;
  z-index: 100;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
`;
