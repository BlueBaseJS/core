import Platform from '../../src/Platform';
const platform = new Platform();
describe('Platform tests', () => {
  it('should set severmode false', () => {
    Platform.setServerMode(false);
    expect(Platform.isOnServer).toEqual(false);
  })
  it('should return platform type web', () => {
    expect(Platform.getType()).toEqual('web');
  })
  it('should return platform type server', () => {
    Platform.setServerMode(true)
    expect(Platform.getType()).toEqual('server');
  })
})