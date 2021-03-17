import {Observer} from './Observer'

export interface Subject{
    observers:Observer[];
    // Attach an observer to the subject.
    attach(observer: Observer): void;

    // Notify all observers about an event.
    notify(observer: Observer): void;
}