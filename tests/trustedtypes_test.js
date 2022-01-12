/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
import '@babel/polyfill';
import {trustedTypesBuilderTestOnly} from '../src/trustedtypes.js';

describe('TrustedTypes', () => {
  let TrustedTypes;
  let setPolicyNameRestrictions;
  let clearPolicyNameRestrictions;
  let getDefaultPolicy;
  let resetDefaultPolicy;

  beforeEach(() => {
    // We need separate instances.
    ({
      trustedTypes: TrustedTypes,
      setPolicyNameRestrictions,
      clearPolicyNameRestrictions,
      getDefaultPolicy,
      resetDefaultPolicy} = trustedTypesBuilderTestOnly());
  });

  const noopPolicy = {
    'createHTML': (s) => s,
    'createScriptURL': (s) => s,
    'createScript': (s) => s,
  };

  it('is frozen', () => {
    expect(Object.isFrozen(TrustedTypes)).toBe(true);
  });

  describe('createPolicy', () => {
    it('returns a working policy object', () => {
      const p = TrustedTypes.createPolicy('policy', {});

      expect(p.createHTML instanceof Function).toBe(true);
      expect(p.createScript instanceof Function).toBe(true);
      expect(p.createScriptURL instanceof Function).toBe(true);
    });

    ['\'', '"', '^', '!', '?'].forEach(
        (char) => it(`disallows ${char}in policy name`, () => {
          expect(() => {
            TrustedTypes.createPolicy(char, {});
          }).toThrowError(TypeError);
        }));

    [null, undefined, () => {}].forEach((i) =>
      it('creates empty policies if ' + i + ' is passed', () => {
        const warn = spyOn(console, 'warn');
        const p = TrustedTypes.createPolicy('policy', i);

        expect(warn).toHaveBeenCalledWith(jasmine.anything());
        expect(p.createHTML instanceof Function).toBe(true);
        expect(() => p.createHTML('foo')).toThrow();
      }));

    it('disallows multiple default policies', () => {
      TrustedTypes.createPolicy('default', {});

      expect(() => TrustedTypes.createPolicy('default'))
          .toThrowError(TypeError);
    });

    it('returns a policy object with a name', () => {
      const p = TrustedTypes.createPolicy('policy_has_name', {});

      expect(p.name).toEqual('policy_has_name');
    });

    it('ignores methods from policy prototype chain', () => {
      const parent = {
        'createHTML': (s) => s,
      };
      const child = Object.create(parent);
      child['createScriptURL'] = (s) => s;

      const policy = TrustedTypes.createPolicy('policy', child);

      expect('' + policy.createScriptURL('https://foo')).toEqual('https://foo');
      expect(() => policy.createHTML('<foo>')).toThrow();
    });

    it('returns a frozen policy object', () => {
      const p = TrustedTypes.createPolicy('frozencheck', {});

      expect(Object.isFrozen(p)).toBe(true);
      expect(() => {
        p.a = 'foo';
      }).toThrow();

      expect(() => {
        p.createHTML = (s) => s;
      }).toThrow();

      expect(() => {
        delete p.createHTML;
      }).toThrow();
    });
  });

  describe('trusted type constructors', () => {
    it('cannot be used directly', () => {
      const name = 'known';
      TrustedTypes.createPolicy(name, noopPolicy);

      expect(() => new TrustedTypes.TrustedHTML()).toThrow();
      expect(() => new TrustedTypes.TrustedHTML(null, name)).toThrow();
    });
  });

  describe('is* methods', () => {
    it('require the object to be created via policy', () => {
      const p = TrustedTypes.createPolicy('foo', noopPolicy);
      const html = p.createHTML('test');

      expect(TrustedTypes.isHTML(html)).toEqual(true);
      const html2 = Object.create(html);

      // instanceof can pass, but we rely on isHTML
      expect(html2 instanceof TrustedTypes.TrustedHTML).toEqual(true);
      expect(TrustedTypes.isHTML(html2)).toEqual(false);

      const html3 = Object.assign({}, html, {toString: () => 'fake'});

      expect(TrustedTypes.isHTML(html3)).toEqual(false);
    });

    it('cannot be redefined', () => {
      expect(() => TrustedTypes.isHTML = () => true).toThrow();
      expect(TrustedTypes.isHTML({})).toBe(false);
    });
  });

  describe('getAttributeType', () => {
    it('returns the proper type', () => {
      expect(TrustedTypes.getAttributeType('script', 'src')).toEqual(
          'TrustedScriptURL');

      expect(TrustedTypes.getAttributeType('object', 'data')).toEqual(
          'TrustedScriptURL');
    });

    it('ignores attributes from unknown namespaces', () => {
      expect(TrustedTypes.getAttributeType(
          'a', 'href', '', 'http://foo.bar')).toBe(null);
    });

    it('is case insensitive for element names', () => {
      expect(TrustedTypes.getAttributeType('SCRIPT', 'src')).toEqual(
          'TrustedScriptURL');

      expect(TrustedTypes.getAttributeType('ObJECT', 'data')).toEqual(
          'TrustedScriptURL');
    });

    it('is case insensitive for the attribute names', () => {
      expect(TrustedTypes.getAttributeType('script', 'SRC')).toEqual(
          'TrustedScriptURL');

      expect(TrustedTypes.getAttributeType('object', 'data')).toEqual(
          'TrustedScriptURL');
    });

    it('supports the inline event handlers', () => {
      expect(TrustedTypes.getAttributeType('img', 'onerror')).toEqual(
          'TrustedScript');

      expect(TrustedTypes.getAttributeType('unknown', 'onerror')).toEqual(
          'TrustedScript');
    });

    it('defaults to null', () => {
      expect(TrustedTypes.getAttributeType('unknown', 'src')).toBe(null);

      expect(TrustedTypes.getAttributeType('input', 'bar')).toBe(null);
    });
  });

  describe('getPropertyType', () => {
    it('returns the proper type for attribute-related properties', () => {
      expect(TrustedTypes.getPropertyType('script', 'src')).toEqual(
          'TrustedScriptURL');

      expect(TrustedTypes.getPropertyType('object', 'data')).toEqual(
          'TrustedScriptURL');
    });

    it('is case insensitive for tag names', () => {
      expect(TrustedTypes.getPropertyType('SCRIPT', 'src')).toEqual(
          'TrustedScriptURL');

      expect(TrustedTypes.getPropertyType('ObjEct', 'data')).toEqual(
          'TrustedScriptURL');
    });

    it('is case sensitive for property names', () => {
      expect(TrustedTypes.getPropertyType('script', 'sRc')).toBe(null);

      expect(TrustedTypes.getPropertyType('div', 'innerhtml')).toBe(null);
    });

    it('returns the proper type for innerHTML', () => {
      expect(TrustedTypes.getPropertyType('div', 'innerHTML')).toEqual(
          'TrustedHTML');
    });

    it('returns the proper type for outerHTML', () => {
      expect(TrustedTypes.getPropertyType('div', 'outerHTML')).toEqual(
          'TrustedHTML');
    });

    ['text', 'innerText', 'textContent'].forEach(
        (prop) => it('returns the proper type for script.' + prop, () => {
          expect(TrustedTypes.getPropertyType('script', prop)).toEqual(
              'TrustedScript');
        }));
  });

  describe('getTypeMapping', () => {
    it('returns a map', () => {
      const map = TrustedTypes.getTypeMapping();

      expect(map['SCRIPT'].attributes.src).toEqual('TrustedScriptURL');

      expect(map['OBJECT'].attributes.data).toEqual('TrustedScriptURL');
    });

    it('returns a map that has a wildcard entry', () => {
      const map = TrustedTypes.getTypeMapping();

      expect(map['*'].properties.innerHTML).toEqual('TrustedHTML');
    });

    it('returns a map that is aware of inline event handlers', () => {
      const map = TrustedTypes.getTypeMapping();

      expect(map['*'].attributes.onclick).toEqual('TrustedScript');
    });

    it('returns a fresh map', () => {
      const map1 = TrustedTypes.getTypeMapping();
      map1['*'].attributes['onfoo'] = 'bar';
      const map2 = TrustedTypes.getTypeMapping();

      expect(map2['*'].onfoo).toBe(undefined);
    });

    it('defaults to current document namespace', () => {
      const HTML_NS = 'http://www.w3.org/1999/xhtml';
      const mockNsGetter = spyOnProperty(document.documentElement,
          'namespaceURI', 'get').and.returnValues(HTML_NS, 'http://foo.bar');
      // Called once...
      const mapInferredHtml = TrustedTypes.getTypeMapping();
      // And the second time...
      const mapInferredFoo = TrustedTypes.getTypeMapping();
      // Call skipped.
      const mapExplicitHtml = TrustedTypes.getTypeMapping(HTML_NS);

      expect(mapInferredHtml).toEqual(mapExplicitHtml);
      expect(mapInferredFoo).not.toEqual(mapExplicitHtml);
      expect(mockNsGetter.calls.count()).toEqual(2);
    });

    it('returns empty object to unknown namespaces', () => {
      const map = TrustedTypes.getTypeMapping('http://foo/bar');

      expect(map).toEqual({});
    });
  });

  describe('proto attacks', () => {
    it('WeakMap.prototype.has', () => {
      const originalHas = WeakMap.prototype.has;
      let poisonedProto = false;
      try {
        try {
          // eslint-disable-next-line no-extend-native
          WeakMap.prototype.has = () => true;
        } catch (ex) {
          // Ok if poisoning doesn't work.
        }
        poisonedProto = WeakMap.prototype.has !== originalHas;

        // Assumes .has is used in isHTML.
        expect(TrustedTypes.isHTML({})).toBe(false);
      } finally {
        if (poisonedProto) {
          // eslint-disable-next-line no-extend-native
          WeakMap.prototype.has = originalHas;
        }
      }
    });

    it('Object.prototype for property lookup', () => {
      // eslint-disable-next-line no-extend-native
      Object.prototype['FOO'] = {
        attributes: {
          'bar': 'TrustedHTML',
        },
        properties: {
          'baz': 'TrustedHTML',
        },
      };
      // eslint-disable-next-line no-extend-native
      Object.prototype['newattr'] = 'TrustedHTML';
      try {
        expect(TrustedTypes.getPropertyType('foo', 'baz')).toBeNull();
        expect(TrustedTypes.getAttributeType('foo', 'bar')).toBeNull();
        expect(TrustedTypes.getAttributeType('SCRIPT', 'newattr'))
            .toBeNull();
      } finally {
        delete Object.prototype.FOO;
        delete Object.prototype.newattr;
      }
    });
  });

  describe('policy', () => {
    describe('create* methods', () => {
      it('reject by default', () => {
        const p = TrustedTypes.createPolicy('policy', {});

        expect(() => p.createHTML('foo')).toThrow();
        expect(() => p.createScript('foo')).toThrow();
        expect(() => p.createScriptURL('foo')).toThrow();
      });

      it('get their first argument casted to a string', () => {
        const p = TrustedTypes.createPolicy('policy', {
          createHTML(s) {
            return typeof s;
          },
        });

        expect('' + p.createHTML({})).toEqual('string');
      });

      it('support multiple arguments', () => {
        const p = TrustedTypes.createPolicy('policy', {
          createHTML(...args) {
            return [].slice.call(args).join(' ');
          },
        });

        expect('' + p.createHTML('a', 'b', {toString: () => 'c'}))
            .toEqual('a b c');
      });

      it('can be used selectively', () => {
        const p = TrustedTypes.createPolicy('policy', {
          'createHTML': (s) => s,
        });

        expect(() => p.createHTML('foo')).not.toThrow();
        expect(() => p.createScript('foo')).toThrow();
        expect(() => p.createScriptURL('foo')).toThrow();
      });

      it('return working values', () => {
        const name = 'policy';
        const p = TrustedTypes.createPolicy(name, noopPolicy);

        const html = p.createHTML('<foo>');
        const scriptURL = p.createScriptURL('http://b');
        const script = p.createScript('alert(1)');

        expect(TrustedTypes.isHTML(html)).toBe(true);
        expect(TrustedTypes.isScriptURL(scriptURL)).toBe(true);
        expect(TrustedTypes.isScript(script)).toBe(true);

        // Do not rely on instanceof checks though...
        expect(html instanceof TrustedTypes.TrustedHTML).toBe(true);
        expect(scriptURL instanceof TrustedTypes.TrustedScriptURL).toBe(true);
        expect(script instanceof TrustedTypes.TrustedScript).toBe(true);

        expect('' + html).toEqual('<foo>');
        expect('' + scriptURL).toEqual('http://b');
        expect('' + script).toEqual('alert(1)');

        expect(html.policyName).toEqual(name);
        expect(scriptURL.policyName).toEqual(name);
        expect(script.policyName).toEqual(name);
      });

      it('return values that stringify in JSON', () => {
        const name = 'policy';
        const p = TrustedTypes.createPolicy(name, noopPolicy);

        const html = p.createHTML('<foo>');
        const script = p.createScript('alert(1)');
        const scriptURL = p.createScriptURL('http://foo.example');

        expect(JSON.stringify([html, script, scriptURL])).toEqual(
            `["<foo>","alert(1)","http://foo.example"]`);
      });

      it('respect defined transformations', () => {
        const policyRules = {
          createHTML: (s) => 'createHTML:' + s,
          createScript: (s) => 'createScript:' + s,
          createScriptURL: (s) => 'createScriptURL:' + s,
        };
        const p = TrustedTypes.createPolicy('transform', policyRules);

        expect('' + p.createScript('alert(1)')).
            toEqual('createScript:alert(1)');

        expect('' + p.createScriptURL('http://a')).toEqual('createScriptURL:http://a');
        expect('' + p.createHTML('<foo>')).toEqual('createHTML:<foo>');
      });

      it('cast to string', () => {
        const policyRules = {
          createHTML: (s) => [1, 2],
        };
        const p = TrustedTypes.createPolicy('transform', policyRules);

        expect('' + p.createHTML('<foo>')).toBe('1,2');
      });

      [null, undefined].forEach((i) =>
        it('cast ' + i + ' to an empty string', () => {
          const policyRules = {
            createHTML: (s) => i,
          };
          const p = TrustedTypes.createPolicy('transform', policyRules);

          expect('' + p.createHTML('<foo>')).toBe('');
        }));

      it('return frozen values', () => {
        if (!window.Proxy) {
          pending();
        }

        const p = TrustedTypes.createPolicy('policy', noopPolicy);

        const html = p.createHTML('foo');

        expect(Object.isFrozen(html)).toBe(true);
        expect(() => html.toString = () => 'fake').toThrow();
        expect(() => html.__proto__ = {toString: () => 'fake'}).toThrow();
        expect(() => html.__proto__.toString = () => 'fake').toThrow();

        // Prevent sanitizer that passes javascript:... from masquerading.
        expect(
            () => Object.setPrototypeOf(html,
                TrustedTypes.TrustedScriptURL.prototype))
            .toThrow();

        // Proxy that traps get of toString.
        const proxyHtml = new Proxy(html, {
          get: (target, key, receiver) => {
            if (key === 'toString') {
              return () => 'fake';
            }
          },
        });

        expect(proxyHtml.toString() !== 'foo' && TrustedTypes.isHTML(proxyHtml))
            .toBe(false);

        // Check that the attacks above don't succeed and throw.
        expect(TrustedTypes.isHTML(html)).toBe(true);
        expect(TrustedTypes.isScriptURL(html)).toBe(false);
        expect(String(html)).toEqual('foo');
      });
    });
  });

  describe('setPolicyNameRestrictions', () => {
    it('is not applied unless called', () => {
      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
    });

    it('is applied by createPolicy', () => {
      setPolicyNameRestrictions(['bar'], false);

      expect(() => TrustedTypes.createPolicy('foo', {})).toThrow();
      expect(() => TrustedTypes.createPolicy('bar', {})).not.toThrow();
    });

    it('checks for duplicate policy names', () => {
      setPolicyNameRestrictions(['foo'], true);

      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('bar', {})).toThrow();
    });

    it('when called with *, allows for any unique policy names', () => {
      setPolicyNameRestrictions(['foo', '*'], false);

      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('bar', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('baz', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('baz', {})).toThrow();
    });
  });

  describe('clearPolicyNameRestrictions', () => {
    it('removes all restrictions', () => {
      setPolicyNameRestrictions(['bar'], false);

      expect(() => TrustedTypes.createPolicy('foo', {})).toThrow();
      clearPolicyNameRestrictions();

      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
    });
  });

  describe('getDefaultPolicy', () => {
    it('returns null initially', () => {
      expect(getDefaultPolicy()).toBe(null);
    });

    it('returns the default policy if created', () => {
      TrustedTypes.createPolicy('foo', {});
      const policy = TrustedTypes.createPolicy('default', {});
      TrustedTypes.createPolicy('bar', {});

      expect(getDefaultPolicy()).toBe(policy);
    });
  });

  describe('factory defaultPolicy property', () => {
    it('returns null initially', () => {
      expect(TrustedTypes.defaultPolicy).toBe(null);
    });

    it('returns the default policy if created', () => {
      TrustedTypes.createPolicy('foo', {});
      const policy = TrustedTypes.createPolicy('default', {});
      TrustedTypes.createPolicy('bar', {});

      expect(TrustedTypes.defaultPolicy).toBe(policy);
    });

    it('is readonly', () => {
      TrustedTypes.defaultPolicy = TrustedTypes.createPolicy('foo', {});

      expect(TrustedTypes.defaultPolicy).toBe(null);
    });
  });


  describe('resetDefaultPolicy', () => {
    beforeEach(() => {
      TrustedTypes.createPolicy('default', {});
    });

    it('makes getDefaultPolicy return null', () => {
      expect(getDefaultPolicy()).not.toBe(null);
      resetDefaultPolicy();

      expect(getDefaultPolicy()).toBe(null);
    });

    it('allows creating a new default policy', () => {
      resetDefaultPolicy();

      expect(() => {
        TrustedTypes.createPolicy('default', {});
      }).not.toThrow();
    });
  });

  describe('policy name collision', () => {
    it('is allowed by default', () => {
      TrustedTypes.createPolicy('foo', {});

      expect(() => TrustedTypes.createPolicy('foo', {})).not.toThrow();
    });

    it('can be controlled', () => {
      setPolicyNameRestrictions(['foo'], false);
      TrustedTypes.createPolicy('foo', {});

      expect(() => TrustedTypes.createPolicy('foo', {})).toThrow();
    });
  });

  describe('emptyHTML', () => {
    it('returns an empty-string wrapping object', () => {
      const html = TrustedTypes.emptyHTML;

      expect(TrustedTypes.isHTML(html)).toBe(true);
      expect(html.toString()).toEqual('');
    });

    it('returns the same object instance', () => {
      const [html, html2] = [TrustedTypes.emptyHTML, TrustedTypes.emptyHTML];

      expect(html).toBe(html2);
    });
  });

  describe('emptyScript', () => {
    it('returns an empty-string wrapping object', () => {
      const script = TrustedTypes.emptyScript;

      expect(TrustedTypes.isScript(script)).toBe(true);
      expect(script.toString()).toEqual('');
    });

    it('returns the same object instance', () => {
      const [s, s2] = [TrustedTypes.emptyScript, TrustedTypes.emptyScript];

      expect(s).toBe(s2);
    });

    it('is truthy for eval', () => {
      // This is polyfilled, it should be returned by eval without executing.
      expect(eval(TrustedTypes.emptyScript)).toBeTruthy();
    });
  });

  describe('fromLiteral', () => {
    it('creates a TrustedScript', () => {
      const script = TrustedTypes.TrustedScript.fromLiteral`alert(1)`;

      expect(TrustedTypes.isScript(script)).toBe(true);
      expect('' + script).toEqual('alert(1)');
    });

    it('creates a TrustedScriptURL', () => {
      const scriptURL = TrustedTypes.TrustedScriptURL.fromLiteral`https://foo.example`;

      expect(TrustedTypes.isScriptURL(scriptURL)).toBe(true);
      expect('' + scriptURL).toEqual('https://foo.example');
    });

    it('creates a TrustedHTML', () => {
      const html = TrustedTypes.TrustedHTML.fromLiteral`<div>foo</div>`;

      expect(TrustedTypes.isHTML(html)).toBe(true);
      expect('' + html).toEqual('<div>foo</div>');
    });

    it('canonicalizes TrustedHTML', () => {
      const html = TrustedTypes.TrustedHTML.fromLiteral`<div>foo`;

      expect(TrustedTypes.isHTML(html)).toBe(true);
      expect('' + html).toEqual('<div>foo</div>');
    });

    it('must be called as a template tag', () => {
      expect(() => {
        TrustedTypes.TrustedScript.fromLiteral([`alert(1)`]);
      }).toThrowError(TypeError);
    });

    it('must not interpolate', () => {
      expect(() => {
        TrustedTypes.TrustedScript.fromLiteral`alert(${'1'})`;
      }).toThrowError(TypeError);
    });

    it('cannot be overridden', () => {
      expect(() => {
        TrustedTypes.TrustedScript.fromLiteral = () => {};
      }).toThrow();
    });
  });
});
