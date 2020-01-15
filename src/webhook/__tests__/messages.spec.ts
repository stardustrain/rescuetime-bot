import {
  generateCompareMessage,
} from '../messages'

describe('messages.ts', () => {
  describe('generateCompareMessage(data?: {[key: string]: any})', () => {
    test('should return generated data when received valid data.', () => {
      const data: any = {
        allProductiveTime: {
          compare: 9480,
        },
        allDistractingTime: {
          compare: 7200,
        },
        softwareDevelopmentTime: {
          compare: 7800,
        },
      }
      expect(generateCompareMessage(data)).toEqual({
        compareProductiveImogi: ':chart_with_upwards_trend:',
        compareProductiveTime: '2시간 38분',
        compareDistractingImogi: ':chart_with_upwards_trend:',
        compareDistractingTime: '2시간',
        compareSoftwareDevelopmentImogi: ':chart_with_upwards_trend:',
        compareSoftwareTime: '2시간 10분',
      })

      const other: any = {
        allProductiveTime: {
          compare: 1200,
        },
        allDistractingTime: {
          compare: -600,
        },
        softwareDevelopmentTime: {
          compare: 7800,
        },
      }
      expect(generateCompareMessage(other)).toEqual({
        compareProductiveImogi: ':chart_with_upwards_trend:',
        compareProductiveTime: '20분',
        compareDistractingImogi: ':chart_with_downwards_trend:',
        compareDistractingTime: '-10분',
        compareSoftwareDevelopmentImogi: ':chart_with_upwards_trend:',
        compareSoftwareTime: '2시간 10분',
      })
    })

    test('should rasing error when received invalid data.', () => {
      const empty: any = {}
      expect(() => generateCompareMessage(empty)).toThrow('Yesterday compare message generate failed.')
    })
  })
})
