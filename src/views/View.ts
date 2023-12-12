import { Model, HasId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: Element | null, public model: T) {
    this.bindModel();
  }

  abstract template(): string;
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }
  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    if (this.parent) {
      this.parent.innerHTML = "";
      this.parent.append(templateElement.content);
    }
  }
}
