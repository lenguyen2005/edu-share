import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DocumentUploadedEvent } from 'src/modules/document/application/events/document-uploaded.event';
import { AddExpUseCase } from '../use-cases/add-exp.use-case';
import { PointReason } from '../../domain/enums/point-reason.enum';

@EventsHandler(DocumentUploadedEvent)
export class DocumentUploadedHandler implements IEventHandler<DocumentUploadedEvent> {
  constructor(private readonly addExpUseCase: AddExpUseCase) {}

  async handle(event: DocumentUploadedEvent) {
    await this.addExpUseCase.execute({
      userId: event.authorId,
      amount: 20,
      reason: PointReason.UPLOAD_DOCUMENT,
    });
  }
}
