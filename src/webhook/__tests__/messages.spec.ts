import {
  generateCompareMessage,
} from '../messages'

describe('messages.ts', () => {
  describe('generateCompareMessage(data?: {[key: string]: any})', () => {
    test('should return generated data when received valid data.', () => {
      expect(generateCompareMessage({
        allProductiveMins: {
          compare: 158,
        },
        allDistractingMins: {
          compare: 120,
        },
        softwareDevelopmentMins: {
          compare: 130,
        }
      })).toEqual({
        compareProductiveImogi: ':chart_with_upwards_trend:',
        compareProductiveTime: '2시간 38분',
        compareDistractingImogi: ':chart_with_upwards_trend:',
        compareDistractingTime: '2시간',
        compareSoftwareDevelopmentImogi: ':chart_with_upwards_trend:',
        compareSoftwareTime: '2시간 10분',
      })

      expect(generateCompareMessage({
        allProductiveMins: {
          compare: 20,
        },
        allDistractingMins: {
          compare: -10,
        },
        softwareDevelopmentMins: {
          compare: 130,
        }
      })).toEqual({
        compareProductiveImogi: ':chart_with_upwards_trend:',
        compareProductiveTime: '20분',
        compareDistractingImogi: ':chart_with_downwards_trend:',
        compareDistractingTime: '-10분',
        compareSoftwareDevelopmentImogi: ':chart_with_upwards_trend:',
        compareSoftwareTime: '2시간 10분',
      })
    })

    test('should rasing error when received invalid data.', () => {
      expect(() => generateCompareMessage({})).toThrow('Yesterday compare message generate failed.')
    })
  })
})
