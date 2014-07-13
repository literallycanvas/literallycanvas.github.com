Localization
============

.. js:function:: LC.localize(strings)

    :param strings: Mapping of strings from en_US to another locale
    
    Defines localized strings for all LiterallyCanvas instances. This must be
    called before :js:func:`LC.init`. Any omitted strings will fall back to the
    en_US versions.
