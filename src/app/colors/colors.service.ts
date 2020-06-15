/**
 * Serwis służący do komunikacji z API protokołem HTTP
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from './model/color';
import { ColorsListResponse } from './model/colors-list-response';
import { SingleColorResponse } from './model/single-color-response';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  private static readonly API_URL = 'https://reqres.in/api/colors';

  constructor(private httpClient: HttpClient) {}

  public async getColors(): Promise<Color[]> {
    const response = await this.httpClient
      .get<ColorsListResponse>(ColorsService.API_URL)
      .toPromise();

    return response.data;
  }

  public async getSingleColor(id: number): Promise<Color> {
    const response = await this.httpClient
      .get<SingleColorResponse>(`${ColorsService.API_URL}/${id}`)
      .toPromise();
    return response.data;
  }
}
