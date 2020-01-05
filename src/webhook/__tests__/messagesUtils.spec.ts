import {
  getProductiveImogi,
  getDistractingImogi,
} from '../messageUtils'

describe('messageUtils.ts', () => {
  describe('getProductiveImogi(hour: number)', () => {
    test('should return clap imogi when gte 4 hours.', () => {
      expect(getProductiveImogi(4)).toEqual(':clap:')
      expect(getProductiveImogi(5)).toEqual(':clap:')
    })

    test('should return weary imogi when lt 2 hours.', () => {
      expect(getProductiveImogi(1)).toEqual(':weary:')
      expect(getProductiveImogi(2)).toEqual('')
    })

    test('should return empty when lt 4 hours and gte 2 hours.', () => {
      expect(getProductiveImogi(2)).toEqual('')
      expect(getProductiveImogi(3)).toEqual('')
    })
  })

  describe('getDistractingImogi(hour: number)', () => {
    test('should return clap imogi when lt 1 hours.', () => {
      expect(getDistractingImogi(0)).toEqual(':clap:')
      expect(getDistractingImogi(1)).toEqual('')
    })

    test('should return weary imogi when gte 2 hours.', () => {
      expect(getDistractingImogi(1)).toEqual('')
      expect(getDistractingImogi(2)).toEqual(':weary:')
      expect(getDistractingImogi(3)).toEqual(':weary:')
    })

    test('should return empty when gte 1 hours and lt 2 hours.', () => {
      expect(getDistractingImogi(0)).toEqual(':clap:')
      expect(getDistractingImogi(1)).toEqual('')
      expect(getDistractingImogi(2)).toEqual(':weary:')
      expect(getDistractingImogi(3)).toEqual(':weary:')
    })
  })
})
