import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UpdateWordGroupRequestContract,
  WordGroupContract,
} from '@voclearn/contracts';

@Injectable({ providedIn: 'root' })
export class WordGroupService {
  constructor(private readonly httpClient: HttpClient) {}

  getList(): Observable<WordGroupContract[]> {
    return this.httpClient.get<WordGroupContract[]>('/api/word-group');
  }

  create(contract: WordGroupContract): Observable<void> {
    return this.httpClient.post<void>('/api/word-group', contract);
  }

  delete(wordGroupId: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/word-group/${wordGroupId}`);
  }

  update(
    wordGroupId: string,
    contract: UpdateWordGroupRequestContract
  ): Observable<void> {
    return this.httpClient.patch<void>(
      `/api/word-group/${wordGroupId}`,
      contract
    );
  }
}
